export const taskType = {
    EPIC: "Epic",
    USER_STORY: "User Story",
    TASK: "Task",
    NEW_FEATURE: "New Feature",
    BUG: "Bug"
};

export const taskPriority = {
    BLOCKER: "Blocker",
    CRITICAL: "Critical",
    MAJOR: "Major",
    MINOR: "Minor",
    TRIVIAL: "Trivial"
};

export const taskStatus = {
    TODO: "To Do",
    PROGRESS: "In Progress",
    TESTING: "In Testing",
    DONE: "Done",
};

export const taskResolution = {
    DONE: "Done",
    FIXED: "Fixed",
    UNRESOLVED: "Unresolved",
};

const getEnum = (object: any, propertyName?: string): string[] => {
    const array = [];
    let name;
    for (const property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            if (propertyName) {
                const secondLayer = object[property];
                name = secondLayer[propertyName];
            } else {
                name = object[property];
            }
            array.push(name);
        }
    }
    return array;
};

export const taskTypeEnum = getEnum(taskType);
export const taskPriorityEnum = getEnum(taskPriority);
export const taskResolutionEnum = getEnum(taskResolution);
export const taskStatusEnum = getEnum(taskStatus);

