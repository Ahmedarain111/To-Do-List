from flask import Flask, render_template, url_for, request, redirect
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
    groups = Group.query.all()
    group = request.args.get('group')
    if group:
        tasks = Task.query.filter_by(group=group).all()
    else:
        tasks = Task.query.all()
    return render_template('main.html', tasks=tasks, groups=groups)

@app.route('/add-task', methods=['POST'])
def add_task():
    title = request.form['title']
    desc = request.form['desc']
    priority = request.form['priority']
    date = request.form['date']
    group = request.form['group']
    
    new_task = Task(title=title, desc=desc, priority=priority, date=datetime.strptime(date, '%Y-%m-%d'), group=group)
    db.session.add(new_task)
    db.session.commit()
    
    return redirect(url_for('main'))

@app.route('/add-group', methods=['POST'])
def add_group():
    name = request.form['group-name']
    
    new_group = Group(name=name)
    db.session.add(new_group)
    db.session.commit()
    
    return redirect(url_for('main'))

@app.route('/delete-task/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return redirect(url_for('main'))


if __name__ == '__main__':
    app.run(debug=True)
