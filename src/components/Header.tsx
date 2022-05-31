import { Flex, Text, Input, Icon, HStack, Box, Avatar } from '@chakra-ui/react';
import { RiSearchLine, RiNotificationLine, RiUserAddLine } from 'react-icons/ri'
import { Logo } from './header/Logo';
import { NotificationNav } from './header/NotificationsNav';
import { Profile } from './header/Profile';
import { Search } from './header/Search';

export function Header() {
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
                <Search />
                <NotificationNav />
                <Profile />
            </Flex>
        </Flex>
    )
}