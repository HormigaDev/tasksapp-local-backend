const Task = require('../write/Task');

module.exports = {
  title: Task.title,
  description: Task.description,
  status: Task.status,
  fixed: Task.fixed,
  priority_id: Task.priority_id
}