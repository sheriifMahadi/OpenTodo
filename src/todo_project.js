
class TodoProject{
    constructor() {
        this.project_name = "default"
        this.project_list = []
    }

    defaultProject() {
        return this.project_name
    }

    createNewProject(project_name) {
        if (this.project_list.includes(project_name) == false) {
            return this.project_list.push(project_name)
        }
        else {
        }
    }

    returnProjectName() {
        return this.project_list
    }

    deleteProject(item_to_delete){

        delete this.project_list.indexOf(item_to_delete)
    }

}

class Todo{
    constructor() {
        this.todo_list = []
    }   

    newTodoItem(id, title, desc, due, priority, project) {
        id = this.todo_list.length
        let todo = {}
        todo.id = id
        todo.title = title 
        todo.desc = desc
        todo.due = due 
        todo.priority = priority
        todo.project = project
        return this.todo_list.push(todo)
    }

    returnTodo() {
        return this.todo_list
    }

    deleteTodo(index_of_item){
        return this.todo_list.splice(index_of_item, index_of_item)

    }
    updateTodo(title, desc, due, priority, project) {
        todo.title = title 
        todo.desc = desc
        todo.due = due 
        todo.priority = priority
        todo.project = project
    }
}

export { TodoProject, Todo } 
