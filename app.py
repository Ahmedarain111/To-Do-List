from flask import Flask, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'tasks.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Group(db.Model):
    name = db.Column(db.String(15), primary_key=True)
    tasks = db.relationship('Task', backref='group_obj', lazy=True)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    desc = db.Column(db.String(60))
    priority = db.Column(db.String(4), default='low')
    date = db.Column(db.DateTime, default=datetime.now)
    group = db.Column(db.String(15), db.ForeignKey('group.name'), nullable=False)

    def __repr__(self):
        return f'<Task {self.id} - {self.title}>'


@app.route('/')
def main():
    return render_template('main.html')


if __name__ == '__main__':
    app.run(debug=True)
