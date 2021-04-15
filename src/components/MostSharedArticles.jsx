import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import {getTopSharedArticlesThunk} from '../redux/rootReducer';
import noImage from '.././assets/images/noimage.jpg'
import {FetchError} from "./common/Error";
import {Preloader} from "./common/Preloader";


const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
  },
  cardContent: {
    flexGrow: 1,
  },
  grid: {
    paddingTop: '25px',
  },
  cardTitle: {
    lineHeight: '1.4'
  },
  cardDescription: {
    maxHeight: ' 100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    ['-webkit-box-orient']: 'vertical',
    display: '-webkit-box',
    lineClamp: 4,
  }
}));


export function MostSharedArticles() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {topSharedArticles, isFetching,  requestFailedData} = useSelector(state => ({
    topSharedArticles: state.rootReducer.topSharedArticles,
    isFetching: state.rootReducer.isFetching,
    requestFailedData: state.rootReducer.requestFailedData
  }));

  useEffect(() => {
    dispatch(getTopSharedArticlesThunk())
  }, [])


  if (isFetching) {
    return <Preloader />
  } else if (Array.isArray(topSharedArticles.results) && topSharedArticles.results.length) {
    return (
      topSharedArticles.results.map(article => {
        return (
          <Grid item key={article.id} xs={12} sm={6} md={4} data-id={article.id}>
            <Card className={classes.card}>
              {
                Array.isArray(article.media) && article.media.length > 0
                  ? // render if image exist
                  article.media.map((image, idx) => {
                    return (
                      <CardMedia
                        key={idx}
                        className={classes.cardMedia}
                        image={
                          image['media-metadata'][image['media-metadata'].length - 1].url // last image in array
                        }
                        title={image.caption}
                      />
                    )
                  })
                  : // render if image not exist
                  <CardMedia
                    className={classes.cardMedia}
                    image={noImage}
                    title='No image'
                  />
              }
              <CardContent className={classes.cardContent}>
                <Typography className={classes.cardTitle} gutterBottom variant="h6" component="h2">
                  {article.title}
                </Typography>
                <Typography className={classes.cardDescription}>
                  {article.abstract}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={article.url} component={'a'} target="_blank">
                  Подробнее
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )
      })
    )
  } // if the request is received and the response is an error
  return <FetchError name={requestFailedData.name} message={requestFailedData.message}/>
}
