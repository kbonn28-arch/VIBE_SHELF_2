export const signIn = async (req, res) => {
  try {
    // Mock authentication - in a real app, you'd use Supabase Auth
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    // Mock user data
    const user = {
      id: '1',
      email: email,
      name: 'Book Lover',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Mock token
    const token = 'mock-token';
    
    res.json({
      data: {
        user,
        token,
        expires_in: 3600, // 1 hour
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name required' });
    }
    
    // Mock user creation
    const user = {
      id: Date.now().toString(),
      email,
      name,
      avatar_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Mock token
    const token = 'mock-token';
    
    res.status(201).json({
      data: {
        user,
        token,
        expires_in: 3600,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const signOut = async (req, res) => {
  try {
    // In a real app, you'd invalidate the token
    res.json({ message: 'Signed out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Sign out failed' });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    // User is already attached to req by auth middleware
    res.json({ data: req.user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get current user' });
  }
};
