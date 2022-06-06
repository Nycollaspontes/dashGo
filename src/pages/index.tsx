import { Flex, Button, Stack } from '@chakra-ui/react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../components/form/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



export default function SignIn() {
  // Criacao do schema de validacao 
  const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail Obrigatório').email('E-mail invalido'),
    password: yup.string().required('Senha Obrigatória'),
  })

  // Desestruturacao de ferramentas vindas do useForm
  const { register, handleSubmit, formState } = useForm({
    // Resolver de validacao passando meu schema
    resolver: yupResolver(signInFormSchema)
  });

  // Atribuicao de erros vindo do useForm
  const errors = formState.errors;
  console.log(errors)

  // Funcao de sign in Que recebe os inputs
  const handleSignIn: SubmitHandler<FieldValues> = async (data, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

  }



  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'>
      <Flex
        as='form'
        width='100%'
        maxWidth={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDir='column'
        onSubmit={handleSubmit(handleSignIn)}>


        <Stack spacing='4'>


          <Input

            label='E-mail'
            type='email'
            {...register('email')}
            error={errors.email}
          />
          <Input

            label='Senha'
            type='password'
            {...register('password')}
            error={errors.password}
          />

        </Stack>

        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}
        >
          Entrar

        </Button>
      </Flex>

    </Flex>
  )
}
