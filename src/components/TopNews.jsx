import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { getTopNewsThunk } from '../redux/rootReducer';
import CircularProgress from '@material-ui/core/CircularProgress'
import noImage from '.././assets/images/noimage.jpg'


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


function TopNews(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getTopNewsThunk()
  }, [])

  // console.log(props.topNews.results);



  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {
            props.isFetchingTopNews
              ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '5rem 0' }}><CircularProgress /></div>
              :
              Array.isArray(props.topNews.results) && props.topNews.results.length
              && props.topNews.results.map(article => {
                return (
                  <Grid item key={article.id} xs={12} sm={6} md={4} data-title={article.id}>
                    <Card className={classes.card}>
                      {
                        Array.isArray(article.media) && article.media.length > 0
                          ? // image
                          article.media.map((image, idx) => {
                            return (
                              <CardMedia
                                key={idx}
                                className={classes.cardMedia}
                                image={
                                  image['media-metadata'][image['media-metadata'].length - 1].url
                                }
                                title={image.caption}
                              />
                            )
                          })
                          : // no image
                          <CardMedia
                            className={classes.cardMedia}
                            image={noImage}
                            title='No image'
                          />
                      }

                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {article.title}
                        </Typography>
                        <Typography>
                          {article.abstract}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Подробнее
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
              })

          }

        </Grid>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => ({
  topNews: state.rootReducer.topNews,
  isFetchingTopNews: state.rootReducer.isFetchingTopNews
})


export default connect(mapStateToProps, { getTopNewsThunk })(TopNews)
