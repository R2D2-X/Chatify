import React from 'react'
import {HStack,Avatar,Text} from "@chakra-ui/react";

const Message = ({text,uri,user="other"}) => {
  return (
    <HStack alignSelf={user=="me"? 'flex-end': 'flex-start'} bgColor={"green.100"} borderRadius={"2xl"} paddingX={"4"} paddingY={"1.5"}>
        {
          user == "other" && <Avatar src={uri} size={"sm"} />
        }
        <Text>
            {text}
        </Text>
        {
          user == "me" && <Avatar src={uri} size={"sm"}  />
        }
      </HStack>
  )
}
export default Message