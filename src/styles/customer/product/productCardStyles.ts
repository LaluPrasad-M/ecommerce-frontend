export const customerProductCardStyles = {
  card: { 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column' 
  },
  cardMedia: {
    height: 200,
    cursor: 'zoom-in',
    objectFit: 'contain',
    backgroundColor: 'action.hover',
    padding: '16px'
  },
  cardContent: { 
    flexGrow: 1 
  },
  description: { 
    mb: 2, 
    minHeight: '40px' 
  },
  priceContainer: { 
    display: 'flex', 
    alignItems: 'center' 
  },
  price: { 
    fontWeight: 'bold' 
  },
  cardActions: { 
    padding: 2, 
    pt: 0 
  },
  viewDetailsButton: { 
    flexGrow: 1, 
    mr: 1 
  },
  addToCartButton: { 
    flexGrow: 1 
  },
  previewDialogContent: {
    p: 0,
    position: 'relative'
  },
  closePreviewButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'white',
    bgcolor: 'rgba(0,0,0,0.5)',
    '&:hover': {
      bgcolor: 'rgba(0,0,0,0.7)',
    }
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '80vh',
    display: 'block',
    margin: '0 auto'
  }
}; 