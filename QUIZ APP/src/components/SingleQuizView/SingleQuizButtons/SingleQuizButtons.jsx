import { Text, Button, Flex } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
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
            <Button maxW="20%" margin="5px" onClick={() => handleQuizClick(quiz.id)}>
              Enroll
            </Button>
                  )
            )
          : (
          <Text>You missed the deadline</Text>
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
