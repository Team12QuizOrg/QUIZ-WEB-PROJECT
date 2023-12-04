import SearchBar from "../SearchBar/SearchBar";
import {
  HStack,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverHeader,
  PopoverContent,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { getAllUserData } from "../../services/users.services";
import {
  addGroupMember,
  getLiveTeamMembers,
} from "../../services/groups.services";
import { MdOutlineGroupAdd } from "react-icons/md";
import AppContext from "../../context/AuthContext";
import { sendInvitation } from "../../services/users.services";
import { declineInvitation } from "../../services/users.services";
export default function InviteStudents({ quizId }) {
  const [searchResults, setSearchResults] = useState(null);
  const {userData} = useContext(AppContext)
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    getAllUserData()
      .then((res) => {
        const students = res.filter((user) => user.userType === "student");
        setUsers(students);
      })
      .catch((err) => console.error("error fetching posts: ", err));
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };


  return (
    <>
      <SearchBar
        searchingFor={users}
        onSearchResults={handleSearchResults}
        selectedOption="username"
      />
      <Popover onClose={() => setSearchResults(null)}>
        <PopoverTrigger>
          <Button>Invite</Button>
        </PopoverTrigger>
        {searchResults && searchResults.length > 0 && (
          <PopoverContent justifySelf={'right'} >
            {searchResults.map((user) => (
              <HStack
                key={user.id}
                onClick={() => {
                  sendInvitation(user.handle, userData.handle, quizId);
                  setSearchResults(null);
                }}
                cursor="pointer"
              >
                <PopoverHeader color={"brand.400"} fontWeight={"bold"}>
                  {user.handle}
                </PopoverHeader>
                <Spacer></Spacer>
                <MdOutlineGroupAdd />
              </HStack>
            ))}
          </PopoverContent>
        )}
      </Popover>
    </>
  );
};
