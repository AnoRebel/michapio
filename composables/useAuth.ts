const useUser = () => useState(null);

const useAuth = () => {
  const client = useSupabaseAuthClient();
  /*
   * Login with email and password
   */
  const login = async ({ email, password }) => {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };
  /*
   * Logout
   */
  const logout = async () => {
    const { error } = await client.auth.signOut();
    if (error) throw error;
  };
  /*
   * Check if user is logged in or not
   */
  const isLoggedIn = () => {
    return !!user.value;
  };
  /**
   * Register
   */
  const register = async ({ email, password, ...meta }) => {
    const { data, error } = await client.auth.signUp({
      email,
      password,
      options: {
        data: meta,
        // redirectTo: ${window.location/me?from=registrationConfirmation,
      },
    });
    if (error) throw error;
    return data;
  };
  /*
   * Update user email, password, or meta data
   */
  const update = async body => {
    const { data, error } = await client.auth.updateUser(body);
    if (error) throw error;
    return data;
  };
  /**
   * Send user an email to reset their password
   */
  const resetEmail = async email => {
    const { data, error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: "",
    });
    if (error) throw error;
    return data;
  };

  return {
    login,
    logout,
    isLoggedIn,
    register,
    update,
    resetEmail,
    useUser,
  };
};

export default useAuth;
