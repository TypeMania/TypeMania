// import { useState, useEffect } from "react"
// //enables login auth remain with refresh of screen
// const usePersist = () => {
//     const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist", "username")) || false);

//     useEffect(() => {
//         localStorage.setItem("persist", JSON.stringify(persist))
//     }, [persist])

//     return [persist, setPersist]
// }
// export default usePersist