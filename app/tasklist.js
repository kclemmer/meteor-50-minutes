/**
 * Tasklist
 * Created by ijnek on 2/26/2017.
 */
Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  Template.tasks.helpers({
    tasks: function() {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.tasks.events({
    "submit .add-task": function(event) {
      var name = event.target.name.value;

      Metor.cal('addTask', name);

      event.target.name.value = "";

      return false;
    },
    "click .delete-task": function(event) {
      if(confirm('Delete Task?')){
        Meteor.call('deleteTask', this._id);
      }
      return false;
    }
  });
}

if (Meteor.isServer) {

}

Meteor.methods({
  addTask: function(name){
    if(!Meteor.userID()){
      throw new Meteor.Error('No Access!');
    }

    Tasks.insert({
      name: name,
      createdAt: new Date(),
      userId: Meteor.userId()
    });
  },
  deleteTask: function(taskID){
    Tasks.remove(taskIDd);
  }
});
