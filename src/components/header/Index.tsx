import { Flex, Text, Input, Icon, HStack, Box, Avatar, useBreakpointValue, IconButton } from '@chakra-ui/react';
import { RiSearchLine, RiNotificationLine, RiUserAddLine, RiMenuLine } from 'react-icons/ri'
import { Logo } from './Logo';
import { Search } from './Search';
import { NotificationNav } from './NotificationsNav';
import { Profile } from './Profile';
import { useSidebarDrawer } from '../../contexts/SideBarDrawerContext';



export function Header() {

    const { onOpen} = useSidebarDrawer();



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
                {! wideVersion && (
                    <IconButton
                    aria-label='Open navigation'
                    icon={<Icon as={RiMenuLine} />}
                    fontSize='24'
                    variant='unstyled'
                    onClick={onOpen}
                    mr='2'>
                        
                    </IconButton>
                )}
            <Logo />
            <Flex ml='auto'>
               {wideVersion && <Search />}
                <NotificationNav />
                <Profile showProfileData ={wideVersion}/>
            </Flex>
        </Flex>
    )
}