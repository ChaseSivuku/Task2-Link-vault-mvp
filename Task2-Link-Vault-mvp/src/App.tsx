import { LinkCard } from "./Components/LinkCard/LinkCard";
import { UsernameButton } from "./Components/UsernameButton/UsernameButton";
import { ActionButton } from "./Components/ActionButton/ActionButton";
import { Headingbar } from "./Components/HeeadingBar/Headingbar";
import { NavBar } from "./Components/NavBar/NavBar";
import { Searchbar } from "./Components/SearchBar/Searchbar";



function App() {

  return (
    <>
      <NavBar
        child={<UsernameButton username="Username" url='/icons/account-circle.png'></UsernameButton>}
      ></NavBar>
      <Headingbar heading={"LIST"}
        child1={<ActionButton text="Add Link" iconURL="/icons/add-page.png"></ActionButton>}
        child2={<Searchbar></Searchbar>}
      ></Headingbar>
      <hr />
      <LinkCard title='TikTok'
       description='xxxxxxxxxxxx xxxx xxxxxx xxx xxxxxxxx  xxxxxxxx xxxx xxxx xxx x x xxxxxxxx x xxxxxxxxxxx xxxxx xxxxxx xx'></LinkCard>
    </>
  );
}

export default App;
