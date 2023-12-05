import { useNavigate } from "react-router-dom";
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
import { useState, useEffect } from "react";
import { getAllUserData } from "../../services/users.services";
import {
  addGroupMember,
  getLiveTeamMembers,
} from "../../services/groups.services";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useToast } from '@chakra-ui/react'


export default function AddGroupMember({ group, groupId, currentMembers }) {
  const [searchResults, setSearchResults] = useState(null);
  // const [members, setMembers] = useState([])
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getAllUserData()
      .then((res) => {
        const educators = res.filter((user) => user.userType === "teacher");
        setUsers(educators);
      })
      .catch((err) => console.error("error fetching posts: ", err));
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };
  const handleAddMember = (groupId, member, group) => {
    addGroupMember(groupId, member, group).then((res) =>
      toast({
        description: "Member added successfully.",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    );
    setSearchResults(null);
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
          <Button>Search</Button>
        </PopoverTrigger>
        {searchResults && searchResults.length > 0 && (
          <PopoverContent>
            {searchResults.map((user) => (
              <HStack
                key={user.id}
                onClick={() => {
                  handleAddMember(groupId, user.handle, group);
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
}
