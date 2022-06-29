import { Text, Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/header/Index";
import { Pagination } from "../../components/pagination/Index";
import { Sidebar } from "../../components/sidebar/Index";
import { useUsers } from "../../services/hooks/useUsers";




export default function UserList() {
    const [page , setPage] = useState(1);
    const { data, isLoading,isFetching, error } = useUsers(page);

    const wideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })

    return (
        <Box>
            <Header />

            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />

                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center' >
                        <Heading size='lg' fontWeight='normal' >
                            Usuários

                            {! isLoading && isFetching && <Spinner size='sm' color='gray.500' className='ml-4'/>}
                        </Heading>
                        <Link href='/users/Create' passHref>
                            <Button as='a'
                                size='md'
                                fontSize='small'
                                colorScheme='pink'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}>

                                Criar novo
                            </Button>
                        </Link>
                    </Flex>

                    {isLoading ? (
                        <Flex justify='center'>
                            <Spinner />
                        </Flex>
                    )
                        : error ? (
                            <Flex>
                                <Text>Falha ao obter dados dos usuarios.</Text>
                            </Flex>
                        )
                            : (
                                <>
                                    <Table colorScheme='whiteAlpha'>
                                        <Thead>
                                            <Tr>
                                                <Th px={['4', '4', '6']} color='gray.300' width='8'>
                                                    <Checkbox colorScheme='pink' />
                                                </Th>
                                                <Th> Usuário</Th>
                                                {wideVersion && <Th>Data de cadastro</Th>}
                                                <Th width='8'></Th>
                                            </Tr>
                                        </Thead>

                                        <Tbody>
                                            {data?.users.map((user: { id: string; name: string; email: string; createdAt: string; }) => {
                                                return (
                                                    <Tr key={user.id}>

                                                        <Td px='6'>
                                                            <Checkbox colorScheme='pink' />
                                                        </Td>
                                                        <Td>
                                                            <Box>
                                                                <Text fontWeight='bold'>{user.name}</Text>
                                                                <Text fontSize='sm' color='gray.300'>{user.email}</Text>
                                                            </Box>
                                                        </Td>
                                                        {wideVersion && <Td>{user.createdAt}</Td>}
                                                    </Tr>
                                                )
                                            })}
                                        </Tbody>

                                    </Table>

                                    <Pagination 
                                     totalCountOfRegisters={data.totalCount}
                                     onPageChange = {setPage}
                                     currentPage={page}/>
                                </>
                            )}

                </Box>
            </ Flex >
        </Box>
    );
}
