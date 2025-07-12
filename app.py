import os
from dotenv import load_dotenv
load_dotenv()
from flask import (Flask, flash, render_template, redirect,
                   request, url_for, session)
from pymongo import MongoClient 
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_paginate import Pagination, get_page_args


app = Flask(__name__)


app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.secret_key = os.environ.get("SECRET_KEY")

client = None
db = None 

try:
    print(f"DEBUG: Configured MONGO_URI: {app.config['MONGO_URI']}")
    print(f"DEBUG: Configured MONGO_DBNAME: {app.config['MONGO_DBNAME']}")

    if not app.config["MONGO_URI"] or not app.config["MONGO_DBNAME"]:
        raise ValueError("MONGO_URI or MONGO_DBNAME is not set in environment variables. Check your .env file and its location.")

    client = MongoClient(app.config["MONGO_URI"])
    db = client[app.config["MONGO_DBNAME"]]

    client.admin.command('ping')
    print(f"DEBUG: Flask app successfully connected to database: {db.name}")

except Exception as e:
    print(f"somethign terrible went wronf: {e}")
    import sys
    sys.exit(1)


def pag_items(items):
    """
    Uses flask_pagination and list methods to display 9 items per page
    sorted by the most recently added item.
    ***Page pagination code was modified from mozillazg GitHub demo and
    Pretty Printed Youtube Tutorial on Query Pagination in Flask and MongoDB***
    """
    page, per_page, offset = get_page_args(page_parameter='page',
                                           per_page_parameter='per_page')
    limit = 9
    offset = page * limit - limit
    total = len(items)
    return items[offset: offset + limit]


def pagination_arg(items):
    page, per_page, offset = get_page_args(page_parameter='page',
                                           per_page_parameter='per_page')
    total = len(items)
    return Pagination(page=page, per_page=9, total=total,
                      css_framework="bootstrap3")


def item_categories():
    category_doc = db.categories.find_one({"category_name": "item_categories"})
    if category_doc:
        return category_doc['category_value']
    else:
        print("ERROR: 'item_categories' document not found in 'categories' collection!")
        return []


def profile_img():
    category_doc = db.categories.find_one({"category_name": "image_url"})
    if category_doc:
        return category_doc['category_value']
    else:
        print("ERROR: 'image_url' document not found in 'categories' collection!")
        return []


def item_size_from():
    category_doc = db.categories.find_one({"category_name": "item_size_from"})
    if category_doc:
        return category_doc['category_value']
    else:
        print("ERROR: 'item_size_from' document not found in 'categories' collection!")
        return []


def item_size_fit():
    category_doc = db.categories.find_one({"category_name": "item_size_fit"})
    if category_doc:
        return category_doc['category_value']
    else:
        print("ERROR: 'item_size_fit' document not found in 'categories' collection!")
        return []


def item_used_status():
    category_doc = db.categories.find_one({"category_name": "item_used_status"})
    if category_doc:
        return category_doc['category_value']
    else:
        print("ERROR: 'item_used_status' document not found in 'categories' collection!")
        return []


@app.route("/")
@app.route("/home")
def home():
    """
    Display home page with top 3 liked items
    """
    print(f"DEBUG: Collections in current DB: {db.list_collection_names()}")

    items = list(db.items.find().sort("liked_count", -1).limit(3))

    all_users = list(db.users.find())

    user_data = None
    user_liked_by = []

    if "user" in session:
        user_data = db.users.find_one({"username": session['user']})
        
        user_matches_doc = db.matches.find_one({"username": session['user']})
        if user_matches_doc:
            user_liked_by = user_matches_doc.get("liked_by", [])
        else:
            print(f"DEBUG: No matches document found for user {session['user']}. Creating one.")
            db.matches.insert_one(
                {"username": session['user'], "liked_by": [], "matched_items": [], "matched_creator": []}
            )
            user_liked_by = [] 
    return render_template("index.html", items=items,
                           all_users=all_users, user=user_data,
                           liked=user_liked_by)

@app.route("/items", methods=["GET", "POST"])
def items():
    """
    Display all items sorted by the most recent added
    and Paginate displayed items

    If a user is logged in, retrieve a list of usernames they
    are liked by and retrieve user data to be used in matching
    """
    items = list(db.items.find().sort('_id', -1)) 
    print(f"DEBUG: Found {len(items)} items in /items route.")

    items_paginated = pag_items(items)
    pagination = pagination_arg(items)

    categories = item_categories() 

    all_users = list(db.users.find()) 

    if "user" in session: 
        user_liked_by_doc = db.matches.find_one( 
            {"username": session["user"]})
        user_liked_by = user_liked_by_doc["liked_by"] if user_liked_by_doc else []
        user_data = db.users.find_one(
            {"username": session["user"]})
        return render_template("items.html", items=items_paginated,
                               categories=categories, pagination=pagination,
                               liked=user_liked_by, user=user_data,
                               all_users=all_users)

    return render_template("items.html", items=items_paginated,
                           categories=categories, pagination=pagination,
                           all_users=all_users)


@app.route("/filter")
def filter():
    """
    Get all checked values for category filter,
    find and display items with those categories
    """
    categories = item_categories()
    selected_categories = request.args.getlist("selected-categories")
    items = list(db.items.find( 
        {"category": {"$in": selected_categories}}).sort('_id', -1))

    items_paginated = pag_items(items)
    pagination = pagination_arg(items)
    all_users = list(db.users.find()) 

    if "user" in session:
        user_data = db.users.find_one({"username": session["user"]})
        user_liked_by_doc = db.matches.find_one(
            {"username": session["user"]})
        user_liked_by = user_liked_by_doc["liked_by"] if user_liked_by_doc else []
        return render_template("items.html", items=items_paginated,
                               categories=categories,
                               selected_categories=selected_categories,
                               pagination=pagination,
                               liked=user_liked_by, user=user_data,
                               all_users=all_users)

    return render_template("items.html", items=items_paginated,
                           categories=categories,
                           selected_categories=selected_categories,
                           pagination=pagination,
                           all_users=all_users)


@app.route("/sort/<sort_by>")
def sort(sort_by):
    """
    Sort items alphabetically, reverse alphabetically,
    by the latest date added, by liked items or
    by item being flagged
    """
    all_users = list(db.users.find()) 
    categories = item_categories()
    if sort_by == 'a-to-z':
        items = list(db.items.find().sort("item_name", 1)) 
    elif sort_by == 'z-to-a':
        items = list(db.items.find().sort("item_name", -1)) 
    elif sort_by == 'date':
        items = list(db.items.find().sort("created_on", -1)) 
    elif sort_by == 'liked':
        items = list(db.items.find({"liked_by": session.get('user')}))
    elif sort_by == 'flagged':
        items = list(db.items.find().sort("flagged", -1)) 

    items_paginated = pag_items(items)
    pagination = pagination_arg(items)

    if "user" in session:
        user_liked_by_doc = db.matches.find_one( 
            {"username": session["user"]})
        user_liked_by = user_liked_by_doc["liked_by"] if user_liked_by_doc else []
        user_data = db.users.find_one({"username": session["user"]}) 
        return render_template("items.html", items=items_paginated,
                               categories=categories, pagination=pagination,
                               liked=user_liked_by, user=user_data,
                               all_users=all_users)

    return render_template("items.html", items=items_paginated,
                           categories=categories, pagination=pagination,
                           all_users=all_users)


@app.route("/search")
def search():
    """
    Use an index from items collections to allow the user
    to search through the item names and item short description
    """
    all_users = list(db.users.find()) 
    categories = item_categories()
    query = request.args.get("search")

    items = list(db.items.find({"$text": {"$search": query}})) 

    items_paginated = pag_items(items)
    pagination = pagination_arg(items)

    if "user" in session:
        user_liked_by_doc = db.matches.find_one( 
            {"username": session["user"]})
        user_liked_by = user_liked_by_doc["liked_by"] if user_liked_by_doc else []
        user_data = db.users.find_one({"username": session["user"]}) 
        return render_template("items.html", items=items_paginated,
                               categories=categories, pagination=pagination,
                               liked=user_liked_by, user=user_data,
                               query=query, all_users=all_users)

    return render_template("items.html", items=items_paginated,
                           categories=categories, pagination=pagination,
                           query=query, all_users=all_users)


@app.route("/register", methods=["GET", "POST"])
def register():
    """
    Checks if a username already exists, if not, the
    usernme and password is added to the users database,
    otherwise the user is redirected to the registration page
    """
    categories = item_categories()
    profile_images = profile_img()
    if request.method == 'POST':
        existing_user = db.users.find_one( 
            {"username": request.form.get("username")})
        if existing_user:
            flash("A Swapper already has this name, pick a new one!")
            return redirect(url_for("register"))

        user_image = request.form.get("user-img")
        print(user_image)
        if user_image is None:
            user_image = "https://images.unsplash.com/photo-"\
                         "1586769852836-bc069f19e1b6?ixlib=rb-1.2."\
                         "1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&"\
                         "fit=crop&w=1650&q=80"

        register = {
            "username": request.form.get("username"),
            "password": generate_password_hash(request.form.get("password")),
            "user_image": user_image,
            "looking_for": request.form.getlist("looking-for"),
            "fb_msgr": request.form.get("fb-msgr"),
            "whatsapp": request.form.get("whatsapp"),
            "instagram": request.form.get("instagram")
        }

        db.users.insert_one(register) 

        # Add new user to matches database to facilitate
        db.matches.insert_one( 
            {"username": request.form.get("username"),
             "liked_by": [],
             "matched_items": [],
             "matched_creator": []})

        session["user"] = request.form.get("username")
        flash("You're officially a Swapper now, woo!")
        return redirect(url_for('items', username=session['user']))

    return render_template("register.html", categories=categories,
                           profile_images=profile_images)


@app.route("/login", methods=["GET", "POST"])
def login():
    """
    Checks if username exists in the database and if it does,
    return the username. The unhashed password from this user's
    dictionary is chekced against the entered password. If password
    or username don't match then a flash message is provided to user as
    feedback.
    """
    if request.method == "POST":
        existing_user = db.users.find_one( 
            {"username": request.form.get("username")})
        # checks if the hashed password in DB matches entered one
        if existing_user:
            if check_password_hash(existing_user["password"],
                                   request.form.get("password")):
                session["user"] = request.form.get("username")
                return redirect(url_for('my_profile',
                                        username=session["user"]))
            else:
                flash("Incorrect Username and/or Password")
                return redirect(url_for('login'))
        # If user doesn't exist
        else:
            flash("Incorrect Username and/or Password")
            return redirect(url_for('login'))

    return render_template("login.html")


@app.route('/logout')
def logout():
    """
    Implement log out functionality by removing user from
    the session cookie
    """
    flash("See you soon")
    session.pop("user")
    return redirect(url_for("login"))


@app.route("/add_item", methods=["GET", "POST"])
def add_item():
    """
    Insert new items added into Items collection along with
    date and time when item was created and the user who
    created the item
    """
    categories = item_categories()
    item_size = item_size_from()
    item_fit = item_size_fit()
    item_used = item_used_status()

    if request.method == "POST":
        item_image = request.form.get("item_image")
        if not item_image: 
            generic_img_doc = db.categories.find_one({"category_name": "generic_item_image"})
            item_image = generic_img_doc['category_value'] if generic_img_doc else "https://images.unsplash.com/photo-1560938446-2402127161b9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


        new_item = {
            "item_image": item_image,
            "item_name": request.form.get("item_name"),
            "short_description": request.form.get("short_desc"),
            "long_description": request.form.get("long_desc"),
            "category": request.form.get("category"),
            "size_gender": request.form.get("item_fit"),
            "size_country": request.form.get("size_region"),
            "size": request.form.get("size"),
            "used_status": request.form.get("used_status"),
            "created_on": datetime.now(),
            "created_by": session["user"],
            "liked_by": [],
            "liked_count": 0,
            "flagged": "N",
        }
        db.items.insert_one(new_item) 
        flash("Item added succesfully")
        return redirect(url_for('items', username=session['user']))

    user_data = db.users.find_one( 
        {"username": session["user"]})
    return render_template("add_item.html", categories=categories,
                           user=user_data,
                           item_size=item_size, item_fit=item_fit,
                           item_used=item_used)


@app.route("/edit_item/<item_id>", methods=["GET", "POST"])
def edit_item(item_id):
    """
    Edit a chosen item identified by item_id and display updated version
    after changes have been submitted
    """
    categories = item_categories()
    item_size = item_size_from()
    item_fit = item_size_fit()
    item_used = item_used_status()
    if request.method == "POST":
        edited_item = {
            "item_image": request.form.get("item_image"),
            "item_name": request.form.get("item_name"),
            "short_description": request.form.get("short_desc"),
            "long_description": request.form.get("long_desc"),
            "category": request.form.get("category"),
            "size_gender": request.form.get("item_fit"),
            "size_country": request.form.get("size_region"),
            "size": request.form.get("size"),
            "used_status": request.form.get("used_status"),
            "created_on": datetime.now(),
            "created_by": session["user"],
            "liked_by": [],
            "liked_count": 0,
            "flagged": "N",
        }
        db.items.update_one({"_id": ObjectId(item_id)}, {"$set": edited_item}) 
        flash("'{}' updated succesfully".format(edited_item["item_name"]))
        return redirect(url_for('items', username=session['user']))

    item = db.items.find_one( 
        {"_id": ObjectId(item_id)})
    user_data = db.users.find_one({"username": session["user"]}) 
    return render_template("edit_item.html", categories=categories,
                           item=item, user=user_data,
                           item_size=item_size, item_fit=item_fit,
                           item_used=item_used)


@app.route('/delete_item/<item_id>')
def delete_item(item_id):
    # Delete selected item
    db.items.delete_one({'_id': ObjectId(item_id)}) 
    flash("Item deleted succesfully!")
    return redirect(url_for('items', username=session['user']))


@app.route('/liked_item/<item_id>/<action>')
def liked_item(item_id, action):
    """
    If user likes an item, add them to the items collection,
    liked_by array. If the user unlikes the item,
    remove them from the same array
    """
    user = session['user']
    user_liked_by_doc = db.matches.find_one({"username": user}) 
    user_liked_by = user_liked_by_doc["liked_by"] if user_liked_by_doc else []
    
    item = db.items.find_one({"_id": ObjectId(item_id)})
    if not item:
        flash("Item not found!")
        return redirect(request.referrer)

    item_creator = item["created_by"]
    
    item_creator_matches_doc = db.matches.find_one( 
        {"username": item_creator})
    item_creator_liked_by = item_creator_matches_doc["liked_by"] if item_creator_matches_doc else []

    if action == 'like':
        db.items.update_one({"_id": ObjectId(item_id)}, 
                                  {'$push': {'liked_by': user},
                                  '$inc': {'liked_count': 1}})
        if user not in item_creator_liked_by:
            db.matches.update_one({"username": item_creator}, 
                                        {'$push': {'liked_by': user}}, upsert=True) 
        if item_creator in user_liked_by:
            flash(f"It's a match! You can now click on {item_creator}'s username and say hi :)")

    elif action == 'unlike':
        db.items.update_one({"_id": ObjectId(item_id)}, 
                                  {'$pull': {'liked_by': user},
                                  '$inc': {'liked_count': -1}})
        all_items_from_creator = list(db.items.find( 
            {"created_by": item_creator}))
        liked_items_from_creator = []
        for i_item in all_items_from_creator: 
            if user in i_item["liked_by"]:
                liked_items_from_creator.append(i_item["item_name"])

        if len(liked_items_from_creator) == 0:
            db.matches.update_one({"username": item_creator}, 
                                        {'$pull': {'liked_by': user}})

    return redirect(request.referrer)


@app.route('/flagged_item/<item_id>/<action>')
def flagged_item(item_id, action):
    """
    Allows users to flag items and admin to unflag
    """
    if action == 'flag':
        db.items.update_one({"_id": ObjectId(item_id)}, 
                                  {'$set': {'flagged': 'Y'}})

    elif action == 'unflag':
        db.items.update_one({"_id": ObjectId(item_id)}, 
                                  {'$set': {'flagged': 'N'}})

    return redirect(request.referrer)


@app.route('/my_profile/<username>')
def my_profile(username):
    """
    Get session user data and items data,
    Display them on user's profile page
    """
    items = list(db.items.find()) 
    item_count = db.items.count_documents({"created_by": username})
    all_users = list(db.users.find()) 
    
    user_liked_by_doc = db.matches.find_one({"username": username}) 
    user_liked_by = user_liked_by_doc["liked_by"] if user_liked_by_doc else [] 
    
    user_data = db.users.find_one({"username": username}) 
    
    current_session_user_likes = session.get('user')
    if current_session_user_likes:
        matches = list(db.items.find( 
            {"created_by": {"$in": user_liked_by}, "liked_by": current_session_user_likes}))
    else:
        matches = [] 

    return render_template('my_profile.html',
                           items=items, user=user_data,
                           item_count=item_count, liked=user_liked_by,
                           matches=matches, all_users=all_users)


@app.route('/edit_profile/<username>', methods=['GET', 'POST'])
def edit_profile(username):
    """
    Edit user's profile
    """
    categories = item_categories()
    profile_images = profile_img()
    user_data = db.users.find_one({"username": username}) 

    if request.method == 'POST':
        edited_profile = {
            "username": user_data["username"],
            "password": user_data["password"], 
            "user_image": request.form.get("user-img"),
            "looking_for": request.form.getlist("looking-for"),
            "fb_msgr": request.form.get("fb-msgr"),
            "whatsapp": request.form.get("whatsapp"),
            "instagram": request.form.get("instagram")
        }

        db.users.update_one({"username": session['user']}, {"$set": edited_profile})
        flash(f"{edited_profile['username']}'s profile updated succesfully")
        return redirect(url_for('my_profile', username=username))

    return render_template("edit_profile.html", categories=categories,
                           user=user_data, profile_images=profile_images)


if __name__ == '__main__':
    app.run(host=os.environ.get("IP"),
            port=8080,
            debug=True)