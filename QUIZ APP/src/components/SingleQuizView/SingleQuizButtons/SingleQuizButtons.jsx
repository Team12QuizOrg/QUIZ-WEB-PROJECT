import { Text, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
export const SingleQuizButtons = ({ isPrivate, handleQuizClick, handleDelete, quiz, hasInvite }) => {

    return (
      <div>
        {new Date() < quiz.endTime ? (
          isPrivate === "Private" &&  (quiz.invites && quiz.invites[hasInvite] && quiz.invites[hasInvite].inviteStatus === "false" || !quiz.invites) ? (
            <>
            <Text>You need an invitation</Text>
            </>
          ) : (
            <Button maxW="20%" margin="5px" onClick={() => handleQuizClick(quiz.id)}>
              Enroll
            </Button>
          )
        ) : (
          <Text>You missed the deadline</Text>
        )}
  
        {hasInvite && quiz && (hasInvite.isAdmin || hasInvite.handle === quiz.author) && (
          <Button
            maxW="20%"
            margin="5px"
            onClick={() => handleDelete(quiz.id)}
            flex="1"
            variant="ghost"
            leftIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </div>
    );
  };