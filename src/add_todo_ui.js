import './styles/form_buttons.css'
import './styles/body.css'
import { TodoProject, Todo } from "./todo_project"

let add_project_top = document.querySelector('#project--add-btn')
let add_todo_top = document.querySelector('#todo--add-btn')
let project_div = document.querySelector(".project-add")
let todo_div = document.querySelector(".todo-add")
const container = document.querySelector(".container")
let form_project = document.querySelector('#add-project')
let add_project = document.querySelector("#project-add-btn")
let add_todo = document.querySelector("#todo-add-btn")
let project_options = document.querySelector("#project-select")
let form_todo = document.querySelector('#add-todo')
let update_form_todo = document.querySelector('#update-todo')
let update_btn = document.querySelector("#todo-add-btn-update")
let update = document.querySelector('.not-visible-update')
update.style.display = "none"

function todoDisplayListener() {
    let default_todo_click = document.querySelectorAll('.project')
    default_todo_click.forEach(element => {
        element.addEventListener('click', () => {
            let todo_item = document.querySelectorAll(`#${element.dataset.id}`)
            todo_item.forEach(el => {
                el.parentElement.classList.toggle('close')
            })
        })
    })
    let del_proj = document.querySelectorAll('.del_proj')
    del_proj.forEach(el => {
        el.addEventListener('click', (e) => {
            console.log(e.target.parentElement.parentElement.remove())

        })
    })
}

function addProjectTop() {
    add_project_top.addEventListener('click', () => {
        project_div.style.display = "block"
        add_project_top.style.display = "none"
        todo_div.style.display = "none"
        add_todo_top.style.display = "inline-block"
    })  
}

function addTodoTop() {
    add_todo_top.addEventListener('click', () => {
        todo_div.style.display = "block"
        add_todo_top.style.display = 'none'
        project_div.style.display = "none"
        add_project_top.style.display = "inline-block"
      
      })
}

function addProjectToUI() {
    let default_project = new TodoProject()
    const projects_div = document.createElement('div')
    const default_projects_div = document.createElement('div')
    const added_projects = document.createElement('div')
    const default_project_div_outer = document.createElement('div')

    added_projects.classList.add('new-projects')
    projects_div.classList.add('all-projects')
    default_projects_div.classList.add('default-project', 'project')
    default_project_div_outer.classList.add('default-outer')

    default_projects_div.textContent = default_project.defaultProject()
    default_projects_div.dataset.id = `d${0}`

    add_project.addEventListener('click', (e) => {
        e.preventDefault()
        let project_title = form_project['project_title'].value
        if (project_title == ""){
            return false
        }
        form_project['project_title'].value = ''
        default_project.createNewProject(project_title)
        
        let p = default_project.returnProjectName()
        // added_projects.innerHTML = ""
        project_options.innerHTML = ""
        const opt = document.createElement("option")
        opt.value = 'default'
        opt.innerHTML = 'default'
        opt.dataset.id = 0

        project_options.appendChild(opt)
        project_div.style.display = "none"
        add_project_top.style.display = 'inline-block'
        for (let i = 0; i < p.length; i++) {
            const opt = document.createElement("option")
            opt.value = p[i]
            opt.innerHTML = p[i]
            opt.dataset.id = i + 1
            project_options.appendChild(opt)
            const pd = document.createElement('div')
            const pd_del= document.createElement('span')
            const added_project_div_inner = document.createElement('div')
            added_project_div_inner.classList.add('new-project-inner')
            pd.classList.add("custom", 'project', `dp${i + 1}`)
            pd_del.classList.add("del_proj")
            pd.textContent = p[i]
            pd.dataset.id = `d${i + 1}`
            pd_del.textContent = "X"
            pd.appendChild(pd_del)
            added_project_div_inner.appendChild(pd)
            added_projects.appendChild(added_project_div_inner)
            let w = document.querySelectorAll(`.dp${i + 1}`)
            if (w.length > 1) {
                for (let j = 1; j < w.length; j++) {
                    w[j].parentElement.remove()
                    todoDisplayListener()

                }
            }
        } 
        todoDisplayListener()
    })
    default_project_div_outer.appendChild(default_projects_div)
    projects_div.appendChild(default_project_div_outer)
    projects_div.appendChild(added_projects)
    container.appendChild(projects_div)

}

function addTodoToUi() {
    let new_todo = new Todo()
    add_todo.addEventListener('click', (e) => {
        e.preventDefault()
        let title = form_todo['todo_title'].value
        let desc = form_todo['todo_desc'].value
        let due = form_todo['due'].value
        let priority = form_todo['priority'].value
        let project_opt = form_todo['project-select']
        let project_opt_data = project_opt.options[project_opt.selectedIndex].getAttribute("data-id");
        let project_opt_div = document.querySelector(`[data-id="d${project_opt_data}"]`)
        
        todo_div.style.display = "none"
        add_todo_top.style.display = 'inline-block'

        if (title == ""){
            return false
        }

        form_todo['todo_title'].value = ''
        form_todo['todo_desc'].value = ''
        new_todo.newTodoItem("", title, desc, due, priority, project_opt.value)
        let new_todo_items = new_todo.returnTodo()
        let id = new_todo_items.length
        project_opt_div.parentElement.innerHTML += `<div class="todo_upper" id=${id}>
                                                    <div id=d${project_opt_data} class="title">${title} <span class="btns">
                                                    <p class="update">Update</p><p class="delete">Delete</p></span></div>
                                                    
                                                    <div class="description">Description: ${desc}</div>
                                                    <div  class="due">Task is due on: ${due}</div>
                                                    <div  class="priority">Priority: <span class="priority_color">${priority}</span></div>

                                                    </div>`
    
    todoDisplayListener()
    let priority_color = document.getElementById(id)
    priority_color = priority_color.querySelector('.priority_color')
    function priorityColor(){
        if (priority == "high") {
            priority_color.style.color = "red"
        }
        else if (priority == "medium") {
            priority_color.style.color = "blue"
        }
        else if (priority == "low"){
            priority_color.style.color = "black"
        }
    }
    priorityColor()
    function del() {
        document.querySelectorAll(".delete").forEach(el => {
            el.addEventListener('click', (e) => { 
                id = new_todo_items.length
                new_todo.deleteTodo(id-1)
                e.target.parentElement.parentElement.parentElement.remove()
    
            })
        })
    }
    del()
    document.querySelectorAll(".update").forEach(el => {
        el.addEventListener('click', (e) => {
            container.style.display = "none"
            update.style.display = "block"
            update_form_todo['todo_title_update'].value = title
            update_form_todo['todo_desc_update'].value = desc
            update_form_todo['due-update'].value = due
            update_form_todo['priority-update'].value = priority
            
            update_btn.addEventListener('click', (e) => {
                e.preventDefault()
            let title = update_form_todo['todo_title_update'].value
            
            if (title == "") {
                return false
            }
            let desc = update_form_todo['todo_desc_update'].value 
            let due = update_form_todo['due-update'].value
            let priority = update_form_todo['priority-update'].value
            let status_ = update_form_todo['completed'].checked
            
            container.style.display = "block"
            update.style.display = "none"
            if (status_ == true) {
                id = new_todo_items.length
                new_todo.deleteTodo(id-1)
                el.parentElement.parentElement.parentElement.remove()
            }
            else{

            el.parentElement.parentElement.parentElement.innerHTML = `<div id=d${project_opt_data} class="title">${title} <span class="btns">
                                                                    <p class="update">Update</p><p class="delete">Delete</p></span></div>
                                                                    
                                                                    <div class="description">Description: ${desc}</div>
                                                                   <div  class="due">Task is due on: ${due}</div>
                                                                    <div  class="priority">Priority: <span class="priority_color">${priority}</span></div>`
            del()
            priorityColor()
            }
            })
        })
    });

    })
    todoDisplayListener()
}




export { addProjectTop, addTodoTop, addProjectToUI, addTodoToUi}





