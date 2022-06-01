import { Flex, Text, Input, Icon, HStack, Box, Avatar, useBreakpointValue } from '@chakra-ui/react';
import { RiSearchLine, RiNotificationLine, RiUserAddLine } from 'react-icons/ri'
import { Logo } from './Logo';
import { Search } from './Search';
import { NotificationNav } from './NotificationsNav';
import { Profile } from './Profile';



export function Header() {
    const wideVersion = useBreakpointValue({
        base : false,
        lg : true,
    })


    return (
        <Flex
            as="header"
            w='100%'
            maxWidth={1480}
            h='20'
            mx='auto'
            mt='4'
            align='center'
            px='6' >
            <Logo />
            <Flex ml='auto'>
               {wideVersion && <Search />}
                <NotificationNav />
                <Profile showProfileData ={wideVersion}/>
            </Flex>
        </Flex>
    )
}