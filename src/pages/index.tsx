import { Flex, Button, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Input } from '../components/form/Input';




export default function SignIn() {

  const { register , handleSubmit} = useForm();

  function handleSignIn(data){
    console.log(data)
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


          <Input name='email' label='E-mail' type='email' {...register}/>
          <Input name='password' label='Senha' type='password' {...register}/>

        </Stack>

        <Button
          type='submit'
          mt='6'
          colorScheme='pink'
          size='lg'
        >
          Entrar

        </Button>
      </Flex>

    </Flex>
  )
}
