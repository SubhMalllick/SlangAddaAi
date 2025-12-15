// auth.js - Authentication functions
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    // Listen for auth state changes
    firebaseAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
      this.updateUI();
      
      if (user) {
        console.log("User logged in:", user.email);
        this.loadUserData(user.uid);
      } else {
        console.log("User logged out");
        this.loadGuestData();
      }
    });
  }

  updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userGreeting = document.getElementById('userGreeting');
    
    if (this.currentUser) {
      if (loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${this.currentUser.email.split('@')[0]}`;
        loginBtn.onclick = () => this.showUserMenu();
      }
      if (userGreeting) {
        userGreeting.textContent = `Hi, ${this.currentUser.email.split('@')[0]}`;
      }
    } else {
      if (loginBtn) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> Login / Register`;
        loginBtn.onclick = () => this.showLoginModal();
      }
      if (userGreeting) {
        userGreeting.textContent = "Hi, Guest";
      }
    }
  }

  async login(email, password) {
    try {
      const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async register(email, password, name) {
    try {
      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      
      // Update user profile
      await userCredential.user.updateProfile({
        displayName: name
      });
      
      // Create user document in Firestore
      await firebaseDB.collection('users').doc(userCredential.user.uid).set({
        name: name,
        email: email,
        plan: 'free',
        favorites: [],
        recentSearches: [],
        settings: {
          explainLang: 'hinglish',
          voiceGender: 'neutral',
          showNsfwLink: true
        },
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async loginWithPhone(phoneNumber) {
    try {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      const confirmationResult = await firebaseAuth.signInWithPhoneNumber(phoneNumber, appVerifier);
      
      // Store confirmation result for later use
      window.phoneConfirmationResult = confirmationResult;
      return { success: true, verificationId: confirmationResult.verificationId };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async verifyPhoneCode(code) {
    try {
      const credential = await window.phoneConfirmationResult.confirm(code);
      return { success: true, user: credential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async logout() {
    try {
      await firebaseAuth.signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async loadUserData(uid) {
    try {
      const userDoc = await firebaseDB.collection('users').doc(uid).get();
      if (userDoc.exists) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error("Error loading user data:", error);
      return null;
    }
  }

  loadGuestData() {
    // Load from localStorage for guests
    return {
      favorites: JSON.parse(localStorage.getItem('sa_favs')) || [],
      recentSearches: JSON.parse(localStorage.getItem('sa_recent')) || []
    };
  }

  showLoginModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.classList.add('active');
  }

  showUserMenu() {
    alert(`Logged in as: ${this.currentUser.email}\n\nOptions:\n1. Profile\n2. Settings\n3. Logout`);
  }
}

// Create global instance
window.authManager = new AuthManager();
