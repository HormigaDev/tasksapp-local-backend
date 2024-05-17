module.exports = {
  post: [
    'new-task',
    'new-category',
    'new-affair',
    'new-schedule',
    'new-relation-schedule-priority'
  ],
  get: [
    'get-user',
    'get-task',
    'get-categories',
    'get-tasks',
    'get-affairs',
    'get-affair-timelines',
    'get-tasks-by-date',
    'get-tasks-calendary-day',
    'get-fixed-tasks',
  ],
  put: [
    'edit-user',
    'edit-task',
    'edit-category',
    'edit-affair',
    'edit-affair-timeline',
    'change-password'
  ],
  delete: [
    'delete-user',
    'delete-task',
    'delete-category',
    'delete-affair',
    'delete-affair-timeline'
  ]
}