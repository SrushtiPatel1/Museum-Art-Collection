import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { searchHistoryAtom } from '../store';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData'; // Import removeFromHistory function

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const historyClicked = (e, index) => {
    e.stopPropagation();
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = async (e, index) => { // Modify to be asynchronous
    e.stopPropagation();
    await removeFromHistory(searchHistory[index]); // Use removeFromHistory function to remove history
    setSearchHistory(current => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  };

  if (!searchHistory) return null; // Return null if searchHistory is not yet populated

  let parsedHistory = [];

  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  return (
    <div className="container mt-4">
      {parsedHistory.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Text>Nothing Here. Try searching for some artwork.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item key={index} className={styles.historyListItem} onClick={(e) => historyClicked(e, index)}>
              {Object.keys(historyItem).map(key => (
                <span key={key}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button className="float-end" variant="danger" size="sm" onClick={(e) => removeHistoryClicked(e, index)}>&times;</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
