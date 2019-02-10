/**
 * Learning App
 * server.js
 *
 * @author Brandon Li <brandon.li820@icloud.com> 
 * Created on 2/10/19
 * Copyright © 2019 Brandon Li. All rights reserved.
 *
 * Top-level file That Creates a node server
 * @backend main logic from https://eloquentjavascript.net/
 */
var { createServer } = require( "http" ); // get http

const methods = Object.create(null);

createServer( ( req, res ) => {
  let handler = methods[ req.method ] || denied;
  handler( req )
    .catch( function( err ) {
      if ( err.status != null ){
        return err;
      } 
      return {  
        body: String(err), 
        status: 500
      };
    } )
    .then( function( { body, status = 200, type = "text/plain" } ){
      res.writeHead( status, { "Content-Type": type } );
      if ( body && body.pipe ){
        body.pipe( res );
      }
      else {
        res.end( body );
      }
    } );
} ).listen( 8000 );

async function denied( rew ) {
  return {
    status: 405,
    body: "Method ${ rew.method } not allowed."
  };
}

var { parse } = require("url");
var { resolve, sep } = require("path");

var baseDirectory = process.cwd();

function urlPath( url ) {
  let { pathname } = parse( url );
  let path = resolve( decodeURIComponent( pathname ).slice( 1 ) );
  if ( path != baseDirectory &&
      !path.startsWith(baseDirectory + sep ) ){
    throw {
      status: 403,
      body: "Forbidden"
    };
  }
  return path;
}

const { createReadStream } = require( "fs" );
const { stat, readdir } = require( "fs" ).promises;
const mime = require( "mime" ); //dependencies

methods.GET = async function( request ) { 
  let path = urlPath( request.url );
  let stats;
  try { 
    stats = await stat( path );
  } 
  catch ( err ) { 
    if ( err.code != "ENOENT" ){
      throw err;
    }
    else {
      return { 
        status: 404, 
        body: "File not found" 
      };
    }
  }
  if ( stats.isDirectory() ){ 
    return { 
      body: ( await readdir( path ) ).join( "\n" ) 
    };
  } else { 
    return { 
      body: createReadStream( path ),
      type: mime.getType( path ) 
    };
   }
 };

const { rmdir, unlink } = require( "fs" ).promises;

methods.DELETE = async function( request ) { 
  let path = urlPath(request.url);
  let stats;
  try { 
    stats = await stat(path);
  } 
  catch ( err ){ 
    if ( err.code != "ENOENT" ) throw err;
    else return { status: 204 };
  }
  if ( stats.isDirectory() ) await rmdir( path );
  else await unlink( path );
  return { status: 204 };
};

const { createWriteStream } = require( "fs" );

function pipeStream( from, to ) {
  return new Promise( function( resolve, reject ){
    from.on( "error", reject );
    to.on( "error", reject );
    to.on( "finish", resolve );
    from.pipe( to );
  } );
}

methods.PUT = async function( request ){
  let path = urlPath( request.url );
  await pipeStream( request, createWriteStream( path ) );
  return { 
    status: 204 
  };
};

const { mkdir } = require( "fs" ).promises;

methods.MKCOL = async function( request ){
  let path = urlPath( request.url );
  let stats;
  try {
    stats = await stat(path);
  }
  catch ( error ) {
    if ( error.code != "ENOENT" ) throw error;
    await mkdir( path );
    return {
      status: 204
    };
  }
  if ( stats.isDirectory() ) return { status: 204 };
  else return { status: 400, body: "Not a directory" };
};
