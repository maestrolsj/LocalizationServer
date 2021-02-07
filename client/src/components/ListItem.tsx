import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { User } from '../../interfaces';

type Props = {
    data: User;
};

const ListItem = ({ data }: Props) => {
    const [value, setValue] = useState(1);

    useEffect(() => {
        console.log(value);
        setValue(2);
    }, [value]);

    return (
        <Link href="/users/[id]" as={`/users/${data.id}`}>
            <a>
                {data.id}: {data.name}
            </a>
        </Link>
    );
};

export default ListItem;
