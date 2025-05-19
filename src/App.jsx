import Header from "./components/Header/Header"
import Mainbody from "./components/Mainbody/Mainbody"
import Sidebar from "./components/Sidebar/Sidebar"
import './styles.css'

function App() {

  return (
    <>
     <div className="container">
      <Header/>
      <div className="content">
        <Sidebar/>
        <Mainbody/>
      </div>
     </div>
    </>
  )
}

export default App
