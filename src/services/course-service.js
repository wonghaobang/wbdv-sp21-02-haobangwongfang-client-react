const COURSES_URL = "https://wbdv-generic-server.herokuapp.com/api/001034982/courses"
// const COURSES_URL = "https://wbdv-generic-server.herokuapp.com/api/jannunzi/courses"


export const findAllCourses = () =>
    fetch(COURSES_URL).then(response => response.json())



export const findCourseById = (courseID) =>
    fetch(`${COURSES_URL}/${courseID}`).then(response => response.json())



export const createCourse = (course) =>
    fetch(COURSES_URL, {
        method: "POST",
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())



export const deleteCourse = (courseID) =>
    fetch(`${COURSES_URL}/${courseID}`, {
        method: "DELETE"
    }).then(response => response.json())



export const updateCourse = (courseID, course) =>
    fetch(`${COURSES_URL}/${courseID}`, {
        method: "PUT",
        body: JSON.stringify(course),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())



const api = {
    findAllCourses: findAllCourses,
    findCourseById: findCourseById,
    deleteCourse: deleteCourse,
    createCourse: createCourse,
    updateCourse: updateCourse
}

export default api