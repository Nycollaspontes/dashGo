import { Box, Flex , Text , Avatar} from "@chakra-ui/react";


interface ProfileProps {
    showProfileData ?: Boolean;
}

export function Profile({showProfileData}:ProfileProps) {
    return (
        <Flex align='center'>
           {showProfileData && (
               <Box mr='4' textAlign='right'>
                   <Text>Nycollas Pontes</Text>
                   <Text color='gray.300' fontSize='small'>
                    nycollaspontes@gmail.com
                   </Text>

               </Box>
           )}
            <Avatar size='md' name='Nycollas Pontes' src='https://github.com/nycollaspontes.png' />
        </Flex>
        
    );
}