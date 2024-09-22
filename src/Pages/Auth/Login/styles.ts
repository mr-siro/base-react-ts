import { config } from "@src/Config";

export const styles = {
  login: {
    wrapper: {
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundImage: `url(${config.publicUrl}/Images/overlay.jpg)`,
      height: "100%",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '80px 0',
      alignItems: 'center',
    },
    loginContainer: {
      padding: "40px 20px",
      width: "100%",
      borderRadius: "16px",
      display: "flex",
      flexDirection: "column",
      maxWidth: "420px",
      backgroundColor: "#FFFFFF",
    }
  }
}