import { Box, Flex , Text , Avatar} from "@chakra-ui/react";

export function Profile() {
    return (
        <Flex align='center'>
            <Box>
                <Text>Nycollas Pontes</Text>
                <Text color='gray.300' fontSize='small' >nycollaspontes@gmail.com</Text>
            </Box>
            <Avatar size='md' name='Nycollas Pontes' src='https://github.com/nycollaspontes.png' />
        </Flex>
        
    );
}