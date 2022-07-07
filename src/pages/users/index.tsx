import { Text, Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/header/Index";
import { Pagination } from "../../components/pagination/Index";
import { Sidebar } from "../../components/sidebar/Index";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";




export default function UserList() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error } = useUsers(page);

    const wideVersion = useBreakpointValue({
        base: false,
        lg: true,
    })
    // Funcao de prefetch para o componente de paginação


    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`)


            return response.data;
        }
            , {
                staleTime: 1000 * 60 * 10 // 10 minutos
            }
        )
    }


    return (
        <Box>
            <Header />

            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />

                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center' >
                        <Heading size='lg' fontWeight='normal' >
                            Usuários

                            {!isLoading && isFetching && <Spinner size='sm' color='gray.500' className='ml-4' />}
                        </Heading>
                        <NextLink href='/users/Create' passHref>
                            <Button as='a'
                                size='md'
                                fontSize='small'
                                colorScheme='pink'
                                leftIcon={<Icon as={RiAddLine} fontSize='20' />}>

                                Criar novo
                            </Button>
                        </NextLink>
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
                                                                <Link href='' color='purple.400' onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                                    <Text fontWeight='bold'>{user.name}</Text>
                                                                </Link>

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
                                        onPageChange={setPage}
                                        currentPage={page} />
                                </>
                            )}

                </Box>
            </ Flex >
        </Box>
    );
}
