import bcrypt from "bcryptjs";

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  listAll = () => {
    const usersList = this.userRepository.findAll();

    return usersList;
  };

  createUser = (postedData) => {
    postedData = {
      username: "Fabio",
      email: "teste@teste.com",
      password: "123456",
    };

    const { username, email, password } = postedData;
    // TODO:
    // regra de email único

    if (password.length < 6) {
      return { msg: "senha deve ter no mínimo 6 caracteres" };
    }

    const crypto_password = bcrypt.hashSync(password, 5);
    // Para comparar use bcrypt.compareSync(senha, senha_encriptada)

    const validatedUserData = {
      username: username,
      email: email,
      password: crypto_password,
    };

    const newUser = this.userRepository.save(validatedUserData);

    return newUser;
  };
}

export default UserService;
