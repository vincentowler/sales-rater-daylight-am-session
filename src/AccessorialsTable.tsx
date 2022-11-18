import { Accessorial } from "./services/accessorialsApi";

type AccessorialsTableProps = {
  accessorials: Accessorial[];
};

export default function AccessorialsTable({
  accessorials,
}: AccessorialsTableProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Accessorial Charges</th>
          <th>Charge</th>
        </tr>
      </thead>
      <tbody>
        {/* NOTE: A good key is a unique and stable identifier. 
            Typically a primary key from the DB is the best choice.
            Avoid using the array index as a key because doing so provides no performance benefit 
            (it merely quiets the warning). */}
        {accessorials.map((accessorial) => (
          <tr key={accessorial.chargeDescription}>
            <td>
              <input type="checkbox" id={accessorial.chargeDescription} />
              <label htmlFor={accessorial.chargeDescription}>
                {accessorial.chargeDescription}
              </label>
            </td>
            <td>{accessorial.charge}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
