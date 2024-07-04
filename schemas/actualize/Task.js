const Task = require('../write/Task');

module.exports = {
  title: Task.title,
  description: Task.description,
  status: Task.status,
  priority_id: Task.priority_id,
  run_date: Task.created_at,
  fixed: Task.fixed,
}