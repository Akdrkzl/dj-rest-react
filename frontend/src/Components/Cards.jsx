import Card from 'react-bootstrap/Card';

function Cards({username,f_name,l_name,email}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{f_name} {l_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{username}</Card.Subtitle>
        <Card.Text>
         {email}
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
  );
}

export default Cards;