import { Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const CustomButton = ({ children, ...props }) => {
  return (
        <Button
            css={`
            
            box-shadow: 2px 2px #ffe00b, 4px 4px #151515;
            color: #151515;
            text-transform: lowercase;
            border: solid 2px #151515;
            text-decoration: none;
            padding: 18px 32px;
            display: inline-flex;
            align-items: center;
            font-size: 14px;
            font-weight: 700;
            position: relative;
            z-index: 1;
            transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
            cursor: pointer;
            overflow: hidden;
            transition-delay: 0s !important;
            text-transform: uppercase !important;
            letter-spacing: 1.5px;
            
            &:hover {
              box-shadow: 0 0 #ffe00b, 0 0 #151515;
              color: white;
    
              &::before {
                width: 100%;
                left: 0;
                right: unset;
              }
            }
    
            &::before {
              position: absolute;
              content: '';
              top: 0;
              right: 0;
              width: 0%;
              height: 100%;
              background: #151515;
              z-index: -1;
              transition: 0.5s cubic-bezier(0.785, 0.135, 0.15, 0.86);
            }
        `}
            {...props}
        >
            {children}
        </Button>
  )
}
CustomButton.propTypes = {
  children: PropTypes.string,
  props: PropTypes.func
}
export default CustomButton
