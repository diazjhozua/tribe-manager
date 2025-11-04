namespace tribe_manager.domain.Tribe.Enums;

[Flags]
public enum Permission
{
    None = 0,
    ViewTasks = 1,
    UpdateOwnTasks = 2,
    CreateTasks = 4,
    AssignTasks = 8,
    ViewAllTasks = 16,
    ManageMembers = 32,
    ManageSettings = 64,

    // Composite permissions
    ObserverPermissions = ViewTasks,
    MemberPermissions = ViewTasks | UpdateOwnTasks | CreateTasks,
    LeaderPermissions = ViewTasks | UpdateOwnTasks | CreateTasks | AssignTasks | ViewAllTasks | ManageMembers | ManageSettings
}