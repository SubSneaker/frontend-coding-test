
# Notes by Me (Tom Danino
For notes on the project and usage, please refer to inside the project,
in the [README.md](./lazuli-tomd-codetest/README.md) file.

# Frontend Coding Test Specifications
API integration will be mocked with msw.

## Preparation

- Use msw to mock API integration. You can refer to the example directory. There is no need to set up an actual API server. However, please use the API server link as a reference to understand the API specifications.
- Use Next.js with App router for the project. TypeScript is also required. Default settings are fine, or you can use your regular settings if you have them.
- Follow the Figma design. Use tailwind or css modules, etc. Do not use libraries like MUI. For select elements and button elements, you can use radix or shadcn, etc.
- Structure the directories in a way you consider appropriate.
- Do not reuse the type definitions in msw. The reason is that we want to see how you organize your type definitions.

## Required Features

- Create listing, new creation, and update pages according to the design.
- Create components in appropriate units.
- Be mindful of the distinction between server components and client components. Utilize server actions in appropriate situations.
- Use any component to notify when creation and update requests are successful. Also include notifications for errors. If time constraints make this difficult, window.alert, etc. is acceptable.
- Manage Response types appropriately.
- Format created_at appropriately.
- Since creation and update requests cannot retain data, it is sufficient if the request is executed correctly. You may use useState if possible.

## Additional Tasks if Time Permits

- Form validation
- Adding suspense or loading states
- Test implementation

## Additional Notes
- This test is designed to take approximately 2-4 hours. You don't need to implement all requirements perfectly; doing what you can within this timeframe is sufficient.
- If you have questions or need clarification about project requirements, please don't hesitate to ask. Communication skills are also being evaluated. Consider a scenario where you are setting up a project from scratch and consulting with team members.
- Prioritize the functional aspects of the application, ensuring that all features work as expected.
- Code readability and organization are important. Ensure that your code is readable, appropriately commented, and follows best practices.
- You may use generative AI when writing code, but please be prepared to explain in what aspects you used it.

# フロントエンドコーディングテストの仕様

API連携はmswでモックを使用します。

## 準備

- API連携はmswを使用してモックしてください。exampleディレクトリを参考にしてもらって構いません。実際のAPIサーバーは立てる必要はありません。ただし、APIの仕様理解のためにAPI serverのリンクは参考として使用してください。
- プロジェクトにはNext.jsとApp routerを使用してください。TypeScriptも使用する必要があります。デフォルト設定で構いません。もしくは普段使っている設定があればそちらを使用してください。
- デザインはFigmaのデザインに従ってください。tailwindまたはcss modules等を使用してください。MUIのようなライブラリは使用しないでください。select要素やボタン要素にはradixまたはshadcn等を使って構いません。
- ディレクトリ構造は、自身が適切と思われる形で構築してください。
- mswに記載されている型定義は流用しないでください。型定義をどうまとめるかを見たいのが理由です。

## 必須要件

- デザインの通り、一覧と新規作成、更新のページを作成してください。
- コンポーネントは適切な単位で作成してください。
- server componentとclient componentの使い分けを意識してください。適切なシチュエーションでserver actionも活用してください。
- 作成、更新時には任意のコンポーネントを使用して、リクエストが成功を通知してください。またエラーの際の通知もいれてください。時間の都合で難しければ、window.alert等でも構いません。
- Responseの型などは適切に管理してください。
- created_atは適切にフォーマットを変更してください。
- 作成や更新のリクエストはデータを保持できないため、リクエストが正しく行えれば構いません。可能であればuseStateなどを使っていただいても構いません。

## 時間が許せば追加するタスク

- Formのバリデーション
- suspenseやloadingの追加
- テスト実装

## 追加の注意事項
- このテストは2時間〜4時間程度を目安としています。すべての要件を完璧に実装する必要はなく、できる範囲で構いません。
- プロジェクト要件に関連する質問や明確化が必要な場合は、遠慮なく質問してください。コミュニケーション能力もチェック対象となります。実際にゼロから自分がプロジェクトを立てるときにチームのメンバーに相談するシチュエーションを意識してください。
- アプリケーションの機能的な側面を優先し、すべての機能が期待通りに動作するようにしてください。
- コードの可読性と整理が重要です。コードが読みやすく、適切にコメントが付けられており、ベストプラクティスに従っていることを確認してください。
- コードを書く上で生成AIは使用して構いませんが、どういった点に使用したかを答えられるようにしてください。
