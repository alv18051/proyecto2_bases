from flask import Flask
from flask import render_template # to render the html form
from flask import request # to get user input from sign-in form
import hashlib # included in Python library, no need to install
import psycopg2 # for database connection
from flask_mail import Message

app = Flask(__name__)



# Database creds
t_host = "localhost"
t_port = "5432" #default postgres port
t_dbname = "proyecto2_db"
t_user = "postgres"
t_pw = "bases2022"
db_conn = psycopg2.connect(host=t_host, port=t_port, dbname=t_dbname, user=t_user, password=t_pw)
db_cursor = db_conn.cursor()

@app.route("/")

def showForm():
    # Show our html form to the user.
    t_message = "Login Application"
    return render_template("entrar.html", message = t_message)

@app.route("/entrar", methods=["POST","GET"])
def sign_in():
    t_stage = request.args.get("forgot")
    ID_user = request.args.get("userid")
    t_email = request.form.get("correo", "")
    # The test for "reset" we see here will become relevant later in this article series.
    if t_stage == "login" or t_stage == "reset":
        t_password = request.form.get("contraseña", "")

    # Check for email field left empty
    if t_email == "":
        # "forgot" test below is for later part of our multi-part article, fine here for now:
        if t_stage == "forgot":
            t_message = "Reset Password: Please fill in your email address"
        else:
            t_message = "Login: Please fill in your email address"
        # If empty, send user back, along with a message
        return render_template("entrar.html", message = t_message)

    
    if (t_stage == "login" or t_stage == "reset") and t_password == "":
        t_message = "Login: Please fill in your password"
        # If empty, send user back, along with a message
        return render_template("entrar.html", message = t_message)

    # In both 1st stage and 3rd, we harvest password, so t_stage is "login" or "reset"
    if t_stage == "login" or t_stage == "reset":
        # Hash the password
        t_hashed = hashlib.sha256(t_password.encode())
        t_password = t_hashed.hexdigest()

    # Get user ID from PostgreSQL users table
    s = ""
    s += "SELECT ID FROM users"
    s += " WHERE"
    s += " ("
    s += " correo ='" + t_email + "'"
    if t_stage != "login":
        s += " AND"
        s += " contraseña = '" + t_password + "'"
    s += " AND"
    s += " b_enabled = true"
    s += " )"

    db_cursor.execute(s)
    @app.route('/')
    def index():
        return render_template('perfiles.html')

    # Here we catch and display any errors that occur
    #   while TRYing to commit the execute our SQL script.
    try:
        array_row = cur.fetchone()
    except psycopg2.Error as e:
        t_message = "Database error: " + e + "/n SQL: " + s
        return render_template("entrar.html", message = t_message)

    # Cleanup our database connections
    db_cursor.close()
    db_conn.close()

    ID_user = array_row(0)

    # If they have used the link in the email we sent them then t_stage is "reset"
    if t_stage == "reset":
        print("ye")
       

    # First stage. They have filled in username and password, so t_stage is "login"
    if t_stage == "login":
        # UPDATE the database with a logging of the date of the visit
        s = ""
        s += "UPDATE users SET"
        s += " d_visit_last = '" & now() & "'"
        s += "WHERE"
        s += "("
        s += " ID=" + ID_user
        s += ")"
        
        db_cursor.execute(s)
        try:
            db_conn.commit()
        except psycopg2.Error as e:
            t_message = "Login: Database error: " + e + "/n SQL: " + s
            return render_template("entrar.html", message = t_message)
        db_cursor.close()

        # Redirect user to the rest of your application
        return redirect("https://www.youtube.com", code=302)

    # If they have clicked "Send me a password reset link" then t_stage is "forgot"
    if t_stage == "forgot":
        print("ye")
       

    # If they have used the link in the email we sent them then t_stage is "reset"
    if t_stage == "reset":
        print("ye")
        

# This is for command line testing
if __name__ == "__main__":
    app.run(debug=True)