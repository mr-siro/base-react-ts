import { theme } from "@src/theme";

export const styles = {
  drawer: {
      icon: {
        mr: "auto",
        justifyContent: "center",
        color: '#8F99D3',
        width: '20px',
        height: '20px',
      },
      itemText: (active: boolean) => ({
        '& span': {
          color: '#FFFFFF',
          fontWeight: active ? 800 : 500,
        }
      })
  },
  header: {
    wrapper: {
      background: '#FFFFFF',
      padding: theme.spacing(2.5),
      boxShadow: '0px 4px 30px 0px #0000000D',
    },
    nameCont: {
      marginRight: 'auto',
      '& p': {
        color: '#2C3782',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '25px',
      },
      '& span': {
        width: '29px',
        height: '26px',
        borderRadius: '4px',
        backgroundColor: theme.palette.primary.main,
        display: 'block',
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 500,
      }
    },
    stackCont: {
      boxShadow: 'box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      backgroundColor: '#EBEDFF',
      borderRadius: '6px',
      width: '133px',
      height: '30px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& p': {
        color: '#2C3782',
        fontSize: '12px',
        marginLeft: '12px',
        fontWeight: 500,
      }
    },
    avatar: {
      '& img': {
        width: '30px',
        height: '30px',
        objectFit: 'contain',
        borderRadius: '50%'
      }
    }
  }
}