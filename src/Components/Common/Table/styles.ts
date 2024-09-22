export const styles = {
  table: {
    paper: {
      boxShadow: 'none',
      background: 'transparent',
      overflow: 'hidden',
    },
    header: {
      backgroundColor: "#FFFFFF",
      '& tr th': {
        borderBottom: 'none',
        color: '#2C3782',
        fontWeight: 600,
        fontSize: '13px',
      }
    },
    body: {
      backgroundColor: "#FFFFFF",
      transform: 'translateY(6px)',
      '& tr td': {
        color: '#2C3782',
        fontWeight: 600,
        fontSize: '13px',
      }
    },
  },
};
