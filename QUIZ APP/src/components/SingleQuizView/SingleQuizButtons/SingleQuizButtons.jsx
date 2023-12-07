import { Text, Button, Flex, HStack } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { MdOutlineTimerOff } from "react-icons/md";
import PropTypes from 'prop-types'
export const SingleQuizButtons = ({ isPrivate, handleQuizClick, handleDelete, quiz, hasInvite, user }) => {
  return (
      <Flex justify={'center'}>
        {new Date() < quiz.endTime
          ? (
              isPrivate === 'Private' && ((quiz.invites && quiz.invites[hasInvite] && quiz.invites[hasInvite].inviteStatus === 'false') || !quiz.invites)
                ? (
            <>
            <Text>You need an invitation</Text>
            </>
                  )
                : (
            <Button color={'brand.200'} maxW="20%" margin="5px" onClick={() => handleQuizClick(quiz.id)}>
              Enroll
            </Button>
                  )
            )
          : (
            <HStack>
              <MdOutlineTimerOff ></MdOutlineTimerOff>
              <Text>You missed the deadline</Text>
            </HStack>
            )}

        {user && quiz && (user.isAdmin || user.handle === quiz.author) && (
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
      </Flex>
  )
}
SingleQuizButtons.propTypes = {
  isPrivate: PropTypes.string,
  handleQuizClick: PropTypes.func,
  handleDelete: PropTypes.func,
  quiz: PropTypes.object,
  user: PropTypes.object,
  hasInvite: PropTypes.string
}
