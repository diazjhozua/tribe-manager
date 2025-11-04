# Domain Aggregates

This document defines the core domain aggregates for the Tribe Manager application. Each aggregate represents a consistency boundary within the domain and encapsulates business logic and invariants.

## Table of Contents

- [User Aggregate](#user-aggregate)
- [Tribe Aggregate](#tribe-aggregate)
- [Task Aggregate](#task-aggregate)
- [Aggregate Relationships](#aggregate-relationships)
- [Business Rules](#business-rules)

---

## User Aggregate

The User aggregate represents individual users in the system, handling authentication, profile information, and user preferences.

```csharp
class User
{
    // TODO: Add methods
}
```

### Properties:
- **Core Identity**: Unique identifier, name, email
- **Authentication**: Password hash, salt, security settings
- **Profile**: Avatar, bio, preferences, timezone
- **Activity**: Creation and update timestamps, last login

```json
{
    "id": { "value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890" },
    "firstName": "Sarah",
    "lastName": "Johnson",
    "email": "sarah.johnson@company.com",
    "displayName": "Sarah J.",
    "avatar": {
        "url": "/uploads/avatars/sarah-johnson.jpg",
        "uploadedDateTime": "2025-01-01T09:30:00.0000000Z"
    },
    "bio": "Senior Full-Stack Developer with 8+ years experience in React and .NET",
    "timezone": "America/New_York",
    "preferences": {
        "emailNotifications": true,
        "slackIntegration": true,
        "darkMode": false,
        "language": "en-US"
    },
    "securitySettings": {
        "twoFactorEnabled": true,
        "lastPasswordChange": "2024-11-15T14:22:00.0000000Z",
        "sessionTimeoutMinutes": 480
    },
    "finalHash": "hashed_password_value_here",
    "salt": "random_salt_value_here",
    "lastLoginDateTime": "2025-01-04T08:15:30.0000000Z",
    "createdDateTime": "2024-06-15T10:00:00.0000000Z",
    "updatedDateTime": "2025-01-04T08:15:30.0000000Z",
}
```

## Tribe Aggregate

The Tribe aggregate represents a team or group of users working together. It manages team composition, roles, permissions, and maintains references to associated tasks.

```csharp
class Tribe
{
    // TODO: Add methods for member management, role assignment, etc.
}
```

### Properties:
- **Identity**: Unique identifier, name, description
- **Status**: Current state (Active, Inactive, Archived)
- **Members**: Collection of team members with roles and permissions
- **Task References**: List of task IDs associated with this tribe
- **Metadata**: Creation and update timestamps

### Member Roles:
- **TribeLeader**: Full management permissions
- **Member**: Standard participation permissions
- **Observer**: Read-only access

```json
{
    "id": { "value": "tribe-550e8400-e29b-41d4-a716-446655440001" },
    "name": "Frontend Engineering Team",
    "description": "Responsible for user interface development, UX implementation, and frontend architecture",
    "status": "Active",
    "color": "#4F46E5",
    "avatar": "/uploads/tribe-avatars/frontend-team.png",
    "settings": {
        "isPublic": true,
        "allowSelfJoin": false,
        "maxMembers": 8
    },
    "members": [
        {
            "userId": { "value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890" },
            "role": "TribeLeader",
            "joinedDateTime": "2024-12-01T09:00:00.0000000Z",
            "permissions": ["ManageMembers", "AssignTasks", "ViewAllTasks", "ManageSettings"],
            "pointsEarned": {
                "totalPoints": 21,
                "currentSprintPoints": 8,
                "lastSprintPoints": 13,
                "pointHistory": [
                    {
                        "taskId": { "value": "task-44444444-4444-4444-4444-444444444444" },
                        "subtaskId": { "value": "77777777-7777-7777-7777-777777777777" },
                        "points": 5,
                        "earnedDateTime": "2025-01-02T14:00:00.0000000Z",
                        "reason": "Completed subtask: Setup JWT library"
                    },
                    {
                        "taskId": { "value": "task-55555555-5555-5555-5555-555555555555" },
                        "subtaskId": null,
                        "points": 8,
                        "earnedDateTime": "2025-01-03T16:30:00.0000000Z",
                        "reason": "Completed task: Code review process"
                    }
                ]
            }
        },
        {
            "userId": { "value": "b2c3d4e5-f6g7-8901-bcde-f23456789012" },
            "role": "Member",
            "joinedDateTime": "2024-12-03T14:30:00.0000000Z",
            "permissions": ["ViewTasks", "UpdateOwnTasks", "CreateTasks"],
            "pointsEarned": {
                "totalPoints": 13,
                "currentSprintPoints": 13,
                "lastSprintPoints": 0,
                "pointHistory": [
                    {
                        "taskId": { "value": "task-33333333-3333-3333-3333-333333333333" },
                        "subtaskId": null,
                        "points": 13,
                        "earnedDateTime": "2025-01-01T10:00:00.0000000Z",
                        "reason": "Completed task: Implement user authentication"
                    }
                ]
            }
        },
        {
            "userId": { "value": "c3d4e5f6-g7h8-9012-cdef-345678901234" },
            "role": "Observer",
            "joinedDateTime": "2024-12-15T11:15:00.0000000Z",
            "permissions": ["ViewTasks"],
            "pointsEarned": {
                "totalPoints": 0,
                "currentSprintPoints": 0,
                "lastSprintPoints": 0,
                "pointHistory": []
            }
        }
    ],
    "taskIds": [
        { "value": "task-33333333-3333-3333-3333-333333333333" },
        { "value": "task-44444444-4444-4444-4444-444444444444" },
        { "value": "task-55555555-5555-5555-5555-555555555555" }
    ],
    "statistics": {
        "totalTasks": 3,
        "completedTasks": 1,
        "totalPoints": 34,
        "completedPoints": 13
    },
    "createdDateTime": "2024-12-01T09:00:00.0000000Z",
    "updatedDateTime": "2025-01-04T16:45:00.0000000Z"
}
```

## Task Aggregate

The Task aggregate represents individual work items that can be assigned to team members within a tribe. It manages task lifecycle, progress tracking, and collaboration features.

```csharp
class Task
{
    // TODO: Add methods for status transitions, point calculations, etc.
}
```

### Properties:
- **Core Info**: Title, description, status, priority
- **Points System**: Task points and subtask point breakdown
- **Assignment**: Multiple assignees support
- **Tracking**: Time estimates, actual hours, due dates
- **Collaboration**: Comments, attachments, subtasks
- **Relationships**: Links to tribe and users

```json
{
    "id": { "value": "33333333-3333-3333-3333-333333333333" },
    "title": "Implement user authentication",
    "description": "Add JWT-based authentication system",
    "status": "InProgress",
    "priority": "High",
    "tribeId": { "value": "00000000-0000-0000-0000-000000000000" },
    "assignedToUserIds": [
        { "value": "22222222-2222-2222-2222-222222222222" },
        { "value": "11111111-1111-1111-1111-111111111111" }
    ],
    "createdByUserId": { "value": "11111111-1111-1111-1111-111111111111" },
    "estimatedHours": 16,
    "actualHours": 8,
    "points": 13,
    "dueDate": "2025-01-15T00:00:00.0000000Z",
    "tags": ["authentication", "security", "backend"],
    "comments": [
        {
            "id": { "value": "55555555-5555-5555-5555-555555555555" },
            "userId": { "value": "22222222-2222-2222-2222-222222222222" },
            "content": "Started working on JWT implementation",
            "createdDateTime": "2025-01-03T08:00:00.0000000Z"
        }
    ],
    "attachments": [
        {
            "id": { "value": "66666666-6666-6666-6666-666666666666" },
            "fileName": "auth-design.pdf",
            "filePath": "/uploads/auth-design.pdf",
            "uploadedByUserId": { "value": "11111111-1111-1111-1111-111111111111" },
            "uploadedDateTime": "2025-01-01T10:00:00.0000000Z"
        }
    ],
    "subtasks": [
        {
            "id": { "value": "77777777-7777-7777-7777-777777777777" },
            "title": "Setup JWT library",
            "points": 5,
            "isCompleted": true,
            "completedDateTime": "2025-01-02T14:00:00.0000000Z",
            "completedByUserId": { "value": "a1b2c3d4-e5f6-7890-abcd-ef1234567890" },
            "pointsAwarded": true
        },
        {
            "id": { "value": "88888888-8888-8888-8888-888888888888" },
            "title": "Implement login endpoint",
            "points": 8,
            "isCompleted": false,
            "completedDateTime": null,
            "completedByUserId": null,
            "pointsAwarded": false
        }
    ],
    "createdDateTime": "2025-01-01T00:00:00.0000000Z",
    "updatedDateTime": "2025-01-03T00:00:00.0000000Z"
}
```

---

## Aggregate Relationships

### User ↔ Tribe (Many-to-Many)
- **User Side**: Users can be members of multiple tribes
- **Tribe Side**: Tribes contain multiple users with different roles
- **Implementation**: Tribe.members array contains userId references

### Tribe ↔ Task (One-to-Many)
- **Tribe Side**: Tribe.taskIds array references associated tasks
- **Task Side**: Task.tribeId references the owning tribe
- **Constraint**: A task belongs to exactly one tribe

### User ↔ Task (Many-to-Many)
- **Assignment**: Task.assignedToUserIds array supports multiple assignees
- **Creation**: Task.createdByUserId tracks task creator
- **Comments**: Task.comments contain userId references for authorship

---

## Business Rules

### User Management
1. **Email Uniqueness**: Each user must have a unique email address
2. **Active Status**: Only active users can be assigned to tasks or join tribes
3. **Authentication**: Password changes require current password validation
4. **Profile Integrity**: Display name defaults to "firstName lastName" if not provided

### Tribe Management
1. **Leadership**: Each tribe must have at least one TribeLeader
2. **Member Limits**: Tribes can enforce maximum member limits via settings
3. **Permissions**: Role-based permissions control member capabilities
4. **Statistics**: Tribe statistics are calculated from associated task data

### Task Management
1. **Point Consistency**: Task points must equal the sum of all subtask points
2. **Assignment Rules**: Only tribe members can be assigned to tribe tasks
3. **Status Transitions**: Tasks follow defined workflow states (Pending → InProgress → Completed)
4. **Due Date Logic**: Overdue tasks automatically change priority to High
5. **Subtask Dependencies**: Parent task cannot be completed until all subtasks are done

### Point Distribution Rules
1. **Single Assignee**: When task/subtask has one assignee, they get 100% of points
2. **Multiple Assignees**: Points are split equally among all assignees
3. **Completion Tracking**: Points awarded only when task/subtask is marked complete
4. **Award Prevention**: Points can only be awarded once per task/subtask
5. **Sprint Cycles**: Current sprint points reset at sprint boundaries
6. **Historical Data**: Point history maintains full audit trail of achievements

### Cross-Aggregate Rules
1. **Task Assignment**: Users can only be assigned to tasks in tribes they belong to
2. **Permission Inheritance**: Task permissions are inherited from tribe membership
3. **Data Consistency**: Removing a user from a tribe must handle their task assignments
4. **Audit Trail**: All aggregate changes must update timestamp fields

