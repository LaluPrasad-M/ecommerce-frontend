export const productGridStyles = {
  loadingContainer: {
    display: 'flex', 
    justifyContent: 'center', 
    my: 4
  },
  emptyContainer: {
    textAlign: 'center', 
    my: 4
  },
  gridContainer: { 
    display: 'flex', 
    flexWrap: 'wrap', 
    margin: -1.5,
  },
  gridItem: { 
    width: { 
      xs: '100%', 
      sm: '50%', 
      // md: '33.333%', 
      lg: '33.33%' 
    },
    padding: 1.5,
  }
};

export const productsPageStyles = {
  header: { 
    mb: 4 
  },
  subtitle: {
    color: 'text.secondary'
  },
  container: { 
    display: 'flex', 
    flexDirection: { 
      xs: 'column', 
      md: 'row' 
    }, 
    gap: 3 
  },
  filterContainer: { 
    width: { 
      xs: '100%', 
      md: '250px' 
    }, 
    flexShrink: 0 
  },
  productsContainer: { 
    flexGrow: 1 
  },
  noResultsPaper: {
    p: 4, 
    textAlign: 'center', 
    borderRadius: 2
  },
  noResultsIconContainer: {
    mb: 2
  },
  noResultsIcon: {
    fontSize: 80, 
    color: 'text.secondary', 
    mb: 2
  },
  noResultsText: {
    mb: 3, 
    maxWidth: '80%', 
    mx: 'auto'
  }
}; 