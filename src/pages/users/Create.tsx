import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Input } from "../../components/form/Input";
import { Header } from "../../components/header/Index";
import { Sidebar } from "../../components/sidebar/Index";


const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome Obrigatório'),
    email: yup.string().required('E-mail Obrigatório').email('E-mail invalido'),
    password: yup.string().required('Senha Obrigatória').min(6, 'No minimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'Senhas não conferem'),
})



export default function CreateUser() {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })

    const errors = formState.errors;


    const handleCreateUser: SubmitHandler<FieldValues> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(values)
    }



    return (
        <Box>
            <Header />

            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />

                <Box as='form'
                    flex='1'
                    borderRadius={8}
                    bg='gray.800'
                    p={['6', '8']}
                    onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size='lg' fontWeight='normal'> Criar usuario </Heading>

                    <Divider my='6' borderColor='gray.700' />

                    <VStack spacing='8'>

                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input
                                type='text'
                                label='Nome Completo'
                                {...register('name')}
                                error={errors.name} />

                            <Input
                                type='email'
                                label='E-mail'
                                {...register('email')}
                                error={errors.email}
                            />

                        </SimpleGrid>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input
                                type='password'
                                label='Senha'
                                {...register('password')}
                                error={errors.password} />

                            <Input
                                type='password'
                                label='Confirmação da senha'
                                {...register('password_confirmation')}
                                error={errors.password_confirmation}
                            />

                        </SimpleGrid>

                    </VStack>

                    <Flex mt='8' justify='flex-end'>
                        <HStack spacing='4'>
                            <Link href='/users'>
                                <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
                            </Link>

                            <Button
                                type='submit'
                                colorScheme='pink'
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>

                        </HStack>
                    </Flex>

                </Box>
            </ Flex >
        </Box>
    );
}