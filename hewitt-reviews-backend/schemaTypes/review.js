export default {
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Customer Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            options: {
                list: [
                    { title: '1 Star', value: 1 },
                    { title: '2 Stars', value: 2 },
                    { title: '3 Stars', value: 3 },
                    { title: '4 Stars', value: 4 },
                    { title: '5 Stars', value: 5 }
                ]
            },
            validation: Rule => Rule.required().min(1).max(5)
        },
        {
            name: 'reviewText',
            title: 'Review Text',
            type: 'text',
            validation: Rule => Rule.required()
        }
    ]
}