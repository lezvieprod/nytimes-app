import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {getTopSharedArticlesThunk, setTopSharedArticles} from '../redux/rootReducer';
import CircularProgress from '@material-ui/core/CircularProgress'
import noImage from '.././assets/images/noimage.jpg'
import {Link} from "react-router-dom";


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

function TopNews(props) {
  const classes = useStyles();

  useEffect(() => {
    props.getTopSharedArticlesThunk()
    return () => {
      props.setTopSharedArticles([])
    }
  }, [])

  return (
    <>
      <div style={{margin: '2rem 0', display: 'flex'}}>
        <Link to={`/`}>Back to main</Link>
      </div>
      <Grid container spacing={4}>
        {
          props.isFetching
            ? <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '5rem 0'}}><CircularProgress/></div>
            :
            Array.isArray(props.topSharedArticles.results) && props.topSharedArticles.results.length
            && props.topSharedArticles.results.map(article => {
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
    </>
  )
}

const mapStateToProps = (state) => ({
  topSharedArticles: state.rootReducer.topSharedArticles,
  isFetching: state.rootReducer.isFetching
})
export default connect(mapStateToProps, {getTopSharedArticlesThunk, setTopSharedArticles})(TopNews)
